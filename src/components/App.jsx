import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    keyword: '',
    images: [],
    page: 1,
  };

  searchByKeyword = key => {
    const keywordValue = Object.values(key);
    this.setState({ keyword: keywordValue, page: 1 });
  };

  onLoadMoreClick = () => {
    this.setState(prevSt => ({
      page: prevSt.page + 1,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.keyword !== this.state.keyword ||
      prevState.page !== this.state.page
    ) {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${this.state.keyword}&page=${this.state.page}&key=34039766-687567eb1e3c3ba001a14a80f&image_type=photo&orientation=horizontal&per_page=12`
        );
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
        }));
      } catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    const { images, keyword } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.searchByKeyword} />
        <ImageGallery images={images} />

        {keyword !== '' && <Button onClick={this.onLoadMoreClick} />}
      </div>
    );
  }
}

import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Fragment } from 'react';

export class App extends Component {
  state = {
    keyword: '',
    images: [],
  };

  searchByKeyword = key => {
    const keywordValue = Object.values(key);
    this.setState({ keyword: keywordValue });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.keyword !== this.state.keyword) {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${this.state.keyword}&page=1&key=34039766-687567eb1e3c3ba001a14a80f&image_type=photo&orientation=horizontal&per_page=12`
        );
        this.setState({
          images: response.data.hits,
        });
        // console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    const { images } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.searchByKeyword} />
        <ImageGallery images={images} />
      </div>
    );
  }
}

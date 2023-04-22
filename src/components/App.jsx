import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

const BACE_URL = 'https://pixabay.com/api';
const API_KEY = '34039766-687567eb1e3c3ba001a14a80f';

export class App extends Component {
  state = {
    keyword: '',
    images: [],
    page: 1,
    loading: false,
    showBtn: false,
    findByKeyword: true,
  };

  searchByKeyword = key => {
    const keywordValue = Object.values(key);
    this.setState({
      keyword: keywordValue,
      page: 1,
      loading: false,
      showBtn: false,
      findByKeyword: true,
    });
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
      prevState.keyword !== this.state.keyword
        ? this.setState({ loading: true, images: [] })
        : this.setState({ loading: true });

      try {
        const response = await axios.get(
          `${BACE_URL}/?q=${this.state.keyword}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        if (response.data.total === 0) {
          this.setState({
            images: [],
            showBtn: false,
            loading: false,
            findByKeyword: false,
          });
        } else {
          const totalPages = response.data.total;
          this.setState(prevState => ({
            images: [...prevState.images, ...response.data.hits],
            loading: false,
            showBtn: true,
            findByKeyword: true,
          }));
          console.log(totalPages);
        }

        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }

    // if (
    //   prevState.keyword !== this.state.keyword ||
    //   prevState.page !== this.state.page
    // ) {
    // this.setState({ loading: true });
    // try {
    //   const response = await axios.get(
    //     `${BACE_URL}/?q=${this.state.keyword}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    //   );
    //   if (response.data.total === 0) {
    //     this.setState({
    //       images: [],
    //       showBtn: false,
    //       loading: false,
    //       findByKeyword: false,
    //     });
    //   } else {
    //     const totalPages = response.data.total;
    //     this.setState(prevState => ({
    //       images: [...prevState.images, ...response.data.hits],
    //       loading: false,
    //       showBtn: true,
    //       findByKeyword: true,
    //     }));
    //     console.log(totalPages);
    //   }

    //   console.log(response);
    // } catch (error) {
    //   console.error(error);
    // }
    // }
  }

  render() {
    const { images, keyword, loading, showBtn, findByKeyword } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.searchByKeyword} />
        {findByKeyword ? (
          <ImageGallery images={images} />
        ) : (
          <p>Sorry, we can't find photo by tag {keyword}</p>
        )}

        {loading && <Loader />}
        {showBtn && <Button onClick={this.onLoadMoreClick} />}
      </div>
    );
  }
}

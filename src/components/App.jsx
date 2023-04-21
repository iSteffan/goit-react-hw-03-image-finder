import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    keyword: '',
    imgArray: [],
  };

  searchByKeyword = key => {
    const keywordValue = Object.values(key);
    this.setState({ keyword: keywordValue });
  };

  async componentDidUpdate() {
    if (this.state.keyword !== '') {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${this.state.keyword}&page=1&key=34039766-687567eb1e3c3ba001a14a80f&image_type=photo&orientation=horizontal&per_page=12`
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    return <Searchbar onSubmit={this.searchByKeyword} />;
  }
}

import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    keyword: '',
  };

  searchByKeyword = keyword => {
    console.log(keyword);
  };

  render() {
    return <Searchbar onSubmit={this.searchByKeyword} />;
  }
}

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
    total: 1,
    findByKeyword: true,
  };

  // Отримуємо доступ до ключового слова / скидаємо прапорці в початковий стан
  searchByKeyword = key => {
    const keywordValue = Object.values(key);
    this.setState({
      keyword: keywordValue,
      page: 1,
      loading: false,
      total: 1,
      findByKeyword: true,
    });
  };

  // При кліку на кнопку змінюємо сторінку для пошуку
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
        // якщо нічого не знайдено - скидаємо всі прапорці та масив зображень
        if (response.data.total === 0) {
          this.setState({
            images: [],
            loading: false,
            findByKeyword: false,
          });
        }
        // Якщо отриманий масив не порожній то перезаписуємо масив зображень/вимикаємо спінер/
        // встановлюєм прапорець findByKeyword/ записуємо заг кількість результатів
        else {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.data.hits],
            loading: false,
            findByKeyword: true,
            total: response.data.total,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    const { images, keyword, loading, total, findByKeyword, page } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.searchByKeyword} />

        {/* Перевіряємо чи знайшли фото по запиту - показуємо галерею/повідомлення про невдалий пошук */}
        {findByKeyword ? (
          <ImageGallery images={images} />
        ) : (
          <p
            style={{
              width: '500px',
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: '12px 16px',
              fontWeight: '500',
              fontSize: '20px',
            }}
          >
            Sorry, we can't find photo by tag "{keyword}"
          </p>
        )}

        {/* Перевіряємо стан loading та показуємо спінер*/}
        {loading && <Loader />}

        {/* Перевіряємо кількість сторінок та показуємо кнопку "завантажити ще" */}
        {total / 12 > page && <Button onClick={this.onLoadMoreClick} />}
      </div>
    );
  }
}

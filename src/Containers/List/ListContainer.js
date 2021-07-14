import axios from 'axios';
import moment from 'moment';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import MovieList from '../../Components/List/List'

const GET_API = 'http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=';
const SHOW_API = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888&movieCd=';
const ListContainer = () => {
    const [data, setData] = useState([]);

    const [title, settitle] = useState('');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [movieDetail, setmovieDetail] = useState({ movieInfoResult: false});

    const showModal = (id) => {
        (async() => {
            const { data } = await axios.get(SHOW_API + id);
            setmovieDetail(data);
            setIsModalVisible(true);
        })();
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    
    useEffect(() => {
        (async () => {
            const yesterday = moment()
                .subtract(1, 'days')
                .format('YYYYMMDD');

            const { data } = await axios
                .get(GET_API + yesterday);

            settitle(data.boxOfficeResult.boxofficeType);

            const list = (data && data.boxOfficeResult.dailyBoxOfficeList.map(x => ({
                title: x.rank,
                content: x.movieNm,
                id: x.movieCd
            }))) || [];

            setData(list);

        })();
    }, []);

    return (
        <>
            <p>
                {title}
            </p>

            {movieDetail.movieInfoResult && (
                <Modal title={movieDetail.movieInfoResult.source} visible={isModalVisible} footer={[]} onOk={handleOk} onCancel={handleCancel}>
                    <h2>제목 :{movieDetail.movieInfoResult.movieInfo.movieNm}</h2>
                    <h2>제목(en) :{movieDetail.movieInfoResult.movieInfo.movieNmEn}</h2>
                    <h2>개봉일 :{movieDetail.movieInfoResult.movieInfo.openDt}</h2>
                    <div>
                    출연:
                        <ul>
                            {movieDetail.movieInfoResult.movieInfo.actors.map(item => (<li>
                                <p>배역: {item.cast}</p>
                                <p>배역(en): {item.castEn}</p>
                                <p>이름: {item.peopleNm}</p>
                                <p>이름(en): {item.peopleNmEn}</p>
                            </li>))}
                        </ul>
                    </div>
                    
                </Modal>
            )}
           

            <MovieList data={data} onClick={showModal} />
        </>

    );
}

export default ListContainer;

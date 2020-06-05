import React from 'react'
import { Descriptions, Badge } from 'antd';

function MovieInfo(props) {

    const { movie } = props;

    return (
        <Descriptions title="Informacje" bordered>
            <Descriptions.Item label="Tytuł">{movie.original_title}</Descriptions.Item>
            <Descriptions.Item label="Data premiery">{movie.release_date}</Descriptions.Item>
            <Descriptions.Item label="Dochód">{movie.revenue}$</Descriptions.Item>
            <Descriptions.Item label="Czas trwania">{movie.runtime} min</Descriptions.Item>
            <Descriptions.Item label="Średnia ocena" span={2}>
                {movie.vote_average}
            </Descriptions.Item>
            <Descriptions.Item label="Ilość głosów">{movie.vote_count}</Descriptions.Item>
            <Descriptions.Item label="Status">{movie.status}</Descriptions.Item>
            <Descriptions.Item label="Popularność">{movie.popularity}</Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfo

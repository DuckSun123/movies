import React from 'react';
import { List, Card } from 'antd';

const MovieList = ({ data, onClick }) => {
    return (
        <List grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
            }}
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <Card title={item.title} onClick={() => onClick(item.id)}>{item.content}</Card>
                </List.Item>
            )}
        />
    );
}

export default MovieList;

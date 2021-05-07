import React from 'react';
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';
import { useVideoContext } from '../Context/VideoContext'
function ViewCalculator({ views }) {
    if (views > 1000000)
        return Math.round(views * 100 / 1000000) / 100 + 'M views'
    else
        return Math.round(views * 100 / 1000) / 100 + 'k views'
}
function DateCalculator({ date }) {
    let timeElapsed = Date.now() - Date.parse(date);
    let timeElapsed_inhours = Math.ceil(timeElapsed / 3600000);
    if (timeElapsed_inhours < 23)
        return timeElapsed_inhours + ' hours ago'
    else if (timeElapsed_inhours === 24)
        return Math.ceil(timeElapsed_inhours / 24) + ' day ago'
    else
        return Math.ceil(timeElapsed_inhours / 24) + ' days ago'
}
export const Search = () => {
    const query = new URLSearchParams(useLocation().search).get("query")
    const { AllVideos } = useVideoContext()
    const SearchResult = AllVideos.filter((item) =>
        item.snippet.title.toLowerCase().includes(query.toLowerCase())
    )
    return (
        SearchResult.length > 0 ?
            SearchResult.map(video => {
                return (
                    <div key={video.id} >
                        <Link to={`/video/${video.id}`} style={{ textDecoration: "none" }}>
                            <div className="videoCard" >
                                <img src={video.snippet.thumbnails.medium.url} alt="Loading...." width="300px" />
                                <div className="box-body">
                                    <p style={{ textAlign: "start" }}>{video.snippet.title}</p>
                                    <p style={{ marginTop: "10px", textAlign: "start" }}>{video.snippet.channelTitle}</p>
                                    <p style={{ textAlign: "start" }}>{<ViewCalculator views={video.statistics.viewCount} />} . {<DateCalculator date={video.snippet.publishedAt} />}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            }) : <h1>No Videos Found</h1>
    );
}
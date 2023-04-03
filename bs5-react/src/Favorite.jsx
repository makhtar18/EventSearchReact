import React,{useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiHeart } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';

const Favorite = (props)=>{
    const [isLiked, setIsLiked] = useState(false);
    const favoriteTableString = localStorage.getItem('favoriteTable');
    const favoriteTable = JSON.parse(favoriteTableString);

    useEffect(() => {
        if(favoriteTable[props.eventId]!=undefined && favoriteTable[props.eventId]!=null)
            setIsLiked(true);
    }, []);

    const handleLike = () => {
        setIsLiked(!isLiked);
        favoriteTable[props.eventId]= {
            'date': props.eventsResponse.dateWithoutTime,
            'event': props.eventsResponse.eventName,
            'category': props.eventsResponse.genres,
            'venue': props.eventsResponse.venue
        }
        var favoriteTableStr = JSON.stringify(favoriteTable);
        localStorage.setItem('favoriteTable',favoriteTableStr);
        alert("Event Added to Favorites!");
    };

    const handleDislike = () => {
        setIsLiked(!isLiked);
        delete favoriteTable[props.eventId];
        var favoriteTableStr = JSON.stringify(favoriteTable);
        localStorage.setItem('favoriteTable',favoriteTableStr);
        alert("Event Removed from Favorites!");
    };
    return (
        <div style={{margin:"20px auto 15px auto", cursor:"pointer", display:"inline-block"}}>
            {!isLiked && (<BiHeart className="ms-2" color="black" style={{backgroundColor:"white", border:"0px", borderRadius:"50%", padding:"7px", width:"40px", height:"auto"}} onClick={handleLike}/>)}
            {isLiked && (<AiFillHeart className="ms-2" color="red" style={{backgroundColor:"white", border:"0px", borderRadius:"50%", padding:"7px", width:"40px", height:"auto"}} onClick={handleDislike}/>)}
        </div>
    )
};

export default Favorite;

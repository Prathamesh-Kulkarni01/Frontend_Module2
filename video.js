const YOUTUBE_API="AIzaSyBcu8mHVzGnNdnOZtcbQvUt8I28chkAV4U"
const VIDEO_HTTP="https://www.googleapis.com/youtube/v3/videos?"
const CHANNEL_HTTP="https://www.googleapis.com/youtube/v3/channels?"



const videoCardContainer=document.querySelector('.side_list')

const videoSource = document.getElementById('video-source');


function getVideoIdFromUrl(url) {
    return url.split('?').pop()
}

const videoUrlFromWindow = window.location.href; 
let videoId=getVideoIdFromUrl(videoUrlFromWindow)
// const iframe = document.getElementById('youtube-iframe');
// iframe.src = `https://www.youtube.com/embed/AQEc4BwX6dk`;



fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API}&part=snippet`)
        .then(response => response.json())
        .then(data => {
            const videoData = data.items[0];
            const thumbnailUrl = videoData.snippet.thumbnails.high.url;

            console.log("lllll",data)
            const videoElement = document.querySelector('video');
            videoElement.poster = thumbnailUrl;
           
            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
            videoSource.src = videoUrl;
            videoElement.load(); // Load the new source


        })
        .catch(error => {
            console.error('Error fetching video details:', error);
        });


fetch(VIDEO_HTTP+new URLSearchParams({
    key:YOUTUBE_API,
    part:'snippet',
    chart:'mostPopular',
    relatedToVideoId: videoId,
    maxResults:10,
    regionCode:'IN'
})).then(res=>res.json()).then(data=>{
    // console.log("d",data)
    data.items.forEach(item=>{
        getChannelIcon(item,videoCardContainer)
    })
})
.catch(err=>console.log(err))

const getChannelIcon=(video_data,card)=>{
    fetch(CHANNEL_HTTP+new URLSearchParams({
        key:YOUTUBE_API,
        maxResult:10,
        part:'snippet',
       id:video_data.snippet.channelId
    })).then(res=>res.json()).then(data=>{
        // console.log("d",data)
        video_data.channelThumbnail=data.items[0].snippet.thumbnails.default.url
        console.log({video_data})
        makeVideoCard(video_data,card)
    })
}

const makeVideoCard=(data,card)=>{
    console.log(data)
card.innerHTML+=`
<div class="video">
<a href='/video.html?${data.id}'>
    <img class="thumbnail"
        src="${data.snippet.thumbnails.high.url}"
        alt="video" />
    <div class="content">
        <img class="channel-icon"
            src="${data.channelThumbnail}"
            alt="" />
        <div class="info">
            <h4 class="title">${data.snippet.title}</h4>
            <p class="channel_name"> ${data.snippet.channelTitle}</p>
        </div>
    </div>
</a>
</div>
`


}
const search=()=>{
    let input=document.querySelector(".search_bar")
    videoCardContainer.innerHTML=""
    alert(input.value)
    fetch(`https://www.googleapis.com/youtube/v3/search?`+new URLSearchParams({
        key:YOUTUBE_API,
        part:'snippet',
        chart:'mostPopular',
        maxResults:20,
        q:input.value,
        regionCode:'IN'
    })).then(res=>res.json()).then(data=>{
        // console.log("d",data)
        data.items.forEach(item=>{
            getChannelIcon(item)
        })
    })
    .catch(err=>{

        videoCardContainer.innerHTML="Error"+err
    }
        
        )
}

const YOUTUBE_API="AIzaSyBcu8mHVzGnNdnOZtcbQvUt8I28chkAV4U"
const VIDEO_HTTP="https://www.googleapis.com/youtube/v3/videos?"
const CHANNEL_HTTP="https://www.googleapis.com/youtube/v3/channels?"



const videoCardContainer=document.querySelector('.video_container')

fetch(VIDEO_HTTP+new URLSearchParams({
    key:YOUTUBE_API,
    part:'snippet',
    chart:'mostPopular',
    maxResults:20,
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

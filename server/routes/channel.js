const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
const Domain = require('../models/Domain.js');
dotenv.config();


const channelIDs = [
   'UCoYzQqZNCRqqAomJwJ6yEdg',
   'UC-8QAzbLcRglXeN_MY9blyw',
    'UCmXmlB4-HJytD7wek0Uo97A',
    'UCnP3YHDoGLxkOyVWpMOHnmw',
    'UCsBjURrPoezykLs9EqgamOA',
    'UClb90NQQcskPUGDIXsQEz5Q',
    'UCSKeK_8IzsqwKQBJuIGJPaA',
   'UCeVMnSShP_Iviwkknt83cww'
];


async function getChannelOfDomain(domain) {
    try
    {
        // const { hour_, min_, sec_ } = evaluate();
        const regionCodes = ['IN','US'];
        const request = await axios.create({
            baseURL: 'https://youtube.googleapis.com/youtube/v3',
            params: {
                key: 'AIzaSyDbL_odvGuWqFDq4Sotaf5SnHBvuRFopxg',
            },
        })
        //https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=Web%20Development&regionCode=IN
        
        const result = await Promise.all(
            regionCodes.map(ch =>
            {
                return request.get('/search', {
                    params: {
                        part: "snippet",
                        regionCode: ch,
                        maxResults: 20,
                        q:domain,
                    }
                });
                
            })
               
        )
        return result;
      
    } catch (e)
    {
        console.log(e);
    }
}

async function getVideoDetails(videoId) {
    try {
        const request = await axios.create({
            baseURL: 'https://youtube.googleapis.com/youtube/v3',
            params: {
                key: 'AIzaSyDbL_odvGuWqFDq4Sotaf5SnHBvuRFopxg',
            },
        })
        const video = await request.get('/videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                id:videoId
            }
        })
        console.log('suzzess')
        return video;
    } catch (e) {
        console.log('failure')
    }
}

async function getChannelDetails(channelId)
{
    try
    {
        const request = await axios.create({
            baseURL: 'https://youtube.googleapis.com/youtube/v3',
            params: {
                key : 'AIzaSyDbL_odvGuWqFDq4Sotaf5SnHBvuRFopxg',
            },
        })
        const result = await request.get('/channels', {
            params: {
                part: "snippet,contentDetails,statistics",
                id: channelId
            }
        });
        console.log('sucess')
        return result;
      
    } catch (e)
    {
        console.log(e);
    }
}


router.post('/', async (req, res) =>
{
    const domain = req.query.domain;
    if (domain) {
        try {
            const domainChannels = await getChannelOfDomain(domain);
            const domainResult = domainChannels[0].data;
            const regionCode = domainResult['regionCode'];
            // console.log(domainResult['items']);
            await Promise.all(
                
                domainResult['items'].forEach(async (res) => {
                    try {
                        const videoId = res['id']['videoId']
                        const channelId = res['snippet']['channelId'] 

                        let videoDetails,videoInfo,videoData;
                        if (videoId) {
                            
                           videoDetails  = await getVideoDetails(videoId);
                            videoInfo =  videoDetails.data['items'][0];
                             videoData = {
                                videoId,
                                videoTitle: videoInfo['snippet']['title'],
                                videoPublishTime: videoInfo['snippet']['publishedAt'],
                                videoDesc: videoInfo['snippet']['description'],
                                videoTags: videoInfo['snippet']['tags'],
                                videoViews:videoInfo['statistics']['viewCount'],
                                videoLikes:videoInfo['statistics']['likeCount'],
                                videoThumbnailUrl : videoInfo['snippet']['thumbnails']['medium']['url']
                            }
                        } else {
                            videoData = {};
                        }
                        const channelDetails = await getChannelDetails(channelId);
                        const channelInfo = channelDetails.data['items'][0];
                        
                        const newDomain = new Domain({
                            kind: domain,
                            regionCode,
                            channelData: {
                                channelId,
                                channelTitle: channelInfo['snippet']['title'],
                                channelDesc: channelInfo['snippet']['description'],
                                channelViews: channelInfo['statistics']['viewCount'],
                                channelSubscriberCount: channelInfo['statistics']['subscriberCount'],
                                channelVideoCount : channelInfo['statistics']['videoCount']
                            },
                            videoData
                        })
                        await newDomain.save();
                        console.log('saved');
                    } catch (e) {
                        return console.log(e);
                    }

                }))
            res.status(200).send('success');
        } catch (e) {
            res.send(e);
        }
    }
    
})
// router.get('/domain', async (req, res) => {
//     // const domainName = req.query.domainName
//     // console.log(domainName, typeof (domainName));
//     try {
//         const result = await Domain.find({});
//         res.status(200).send(result);
//         console.log(result);
//     } catch (e) {
//         res.status(500).send(e);
//     }
// })

//Get all channels
router.get('/', async (req, res) =>
{
    const domainName = req.query.domainName;
    try
    {
        // const channels = await YTChannel.find();
        // res.status(200).send(channels);
        const result = await Domain.find({kind : domainName});
        res.send(result);
        // console.log(result);
    } catch (e)
    {
        res.status(500).send(e);
    }
})

module.exports = router;

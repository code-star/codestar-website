import {MAX_VIDEO_DESCRIPTION_LENGTH} from './constants';
const FALLBACK_VIDEOS = require('../data/talks.json').videos;

export default class VideoPlayer {
  constructor(containerId, apiKey, playlistId) {
    VideoPlayer.validateConfig(...arguments);

    this.container = $(containerId);

    VideoPlayer.fetchVideos(apiKey, playlistId, FALLBACK_VIDEOS).then(videos => {
        this.setVideos(videos);
        this.initPlayer();
      });
  }

  static validateConfig(containerId, apiKey, playlistId) {
    if (!containerId || !$(containerId).length) {
      throw new Error('Invalid container id or container node not found!')
    }

    if (!apiKey) {
     throw new Error('No api key provided!')
    }

    if (!playlistId) {
      throw new Error('No playlist id provided!')
    }
  }

  static fetchVideos(apiKey, playlistId, fallbackValue) {
    const requestUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&key=${apiKey}&playlistId=${playlistId}`;

    return new Promise(resolve => {
      fetch(requestUrl)
        .then(response => response.json())
        .then(ytPlaylist => {
          if (!ytPlaylist || ytPlaylist.error) {
            VideoPlayer.fetchVideoError(ytPlaylist.error);
            resolve(fallbackValue);
            return
          }

          const ytVideos = ytPlaylist.items.map(VideoPlayer.toVideoItem);
          resolve(ytVideos);
        })
        .catch(e => {
          VideoPlayer.fetchVideoError(e);
          resolve(fallbackValue);
        })
    })
  }

  static fetchVideoError(error) {
    console.warn('Failed to fetch from Codestar YouTube playlist! Use static fallback.', error);
  }

  static toVideoItem(ytVideoItem) {
    const description = ytVideoItem.snippet.description;

    return {
      id: ytVideoItem.contentDetails.videoId,
      title: ytVideoItem.snippet.title,
      description: VideoPlayer.limitText(description, MAX_VIDEO_DESCRIPTION_LENGTH)
    }
  }

  static limitText(text, limit) {
    return text.length > limit ? `${text.slice(0, limit)}...` : text
  }

  setVideos(videos) {
    const videosContent = videos.map(video => {
      return `<div data-type="youtube" 
                   data-videoid="${video.id}" 
                   data-title="${video.title}" 
                   data-description="${video.description}"></div>`
    });

    this.container.html(videosContent);
  }

  initPlayer() {
    this.container.unitegallery({
      gallery_theme: 'video',
      theme_skin: 'right-no-thumb'
    });
  }
}

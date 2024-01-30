import React, { useState, useRef } from 'react'
import * as htmlToImage from 'html-to-image'
import { toPng, toSvg } from 'html-to-image'
import { saveAs } from 'file-saver'

import '../styles/svg.css'

// -- -- --
// time string MUST be HH:MM::SS format
// return time as seconds (int)
function timeToSeconds(timeAsString) {
  if (!/^[0-5]?[0-9]?:?[0-5]?[0-9]$/.test(timeAsString)) {
    return 0
  }
  return timeAsString.split(':').reduce((acc, time) => 60 * acc + +time)
}

function filter(node) {
  return node.tagName !== 'i'
}

// -- -- --

const SwagSong = () => {
  const [img, setImg] = useState(null)
  const [svg, setSvg] = useState(null)
  const songRef = useRef(null)

  const songName = 'Crush'
  const bandName = 'Dave Matthews Band'
  const songLength = '8:09'
  const songMarker = '4:51'
  const fileName = `song-${bandName}-${songName}`.replaceAll(' ', '').toLowerCase()

  const songLengthSeconds = timeToSeconds(songLength)
  const songMarkerSeconds = timeToSeconds(songMarker)
  const percentPlayed = Math.round((songMarkerSeconds / songLengthSeconds) * 100)

  function downloadSvg() {
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    saveAs(blob, fileName + '.svg')
  }

  function downloadPng() {
    const link = document.createElement('a')
    link.download = `${fileName}.png`
    link.href = img
    link.click()
  }

  // htmlToImage.toPng(songRef.current).then(function (dataUrl) {
  //   setImg(dataUrl)
  // })

  // htmlToImage.toSvg(document.getElementById('song'), { filter: filter }).then(function (dataUrl) {
  //   let svgFromImg = decodeURIComponent(dataUrl.split(',')[1])
  //   setSvg(svgFromImg)
  // })

  return (
    <>
      <p>this thing is bitchy.</p>
      <p>
        the problem is html-2-image doesn't handle external fonts well, and has a problem finding the window to grab
        files... I mean, it does it, but then it starts to flood the console with errors saying it cannot. At some point
        the page reloads the fonts are lost. Easy to correct: comment out the html-to-image functions, reload the page,
        uncomment, reload. The a correct SVG can now be downloaded. Repeat as needed.
      </p>
      <h2>download</h2>
      <button
        type="button"
        onClick={(event) => {
          downloadSvg()
        }}
      >
        get svg
      </button>{' '}
      <button
        type="button"
        onClick={(event) => {
          downloadPng()
        }}
      >
        get png
      </button>
      <h2>img</h2>
      <div className="wrap-img">
        <img src={img} height="100" alt="" />
      </div>
      <hr />
      <h2>html</h2>
      <div ref={songRef} id="song">
        <div className="song">
          <div className="song-name">{songName}</div>
          <div className="song-band">{bandName}</div>
          <div className="song-slider">
            <div className="song-percent-played" style={{ width: `${percentPlayed}%` }}></div>
            <div
              className="song-current-position"
              style={{
                left: `calc(${percentPlayed === 0 ? `1em` : percentPlayed + `%`} - 0.5em)`,
              }}
            ></div>
            <div className="song-track"></div>
            <div className="song-marker-time">{songMarker}</div>
            <div className="song-end-time">{songLength}</div>
          </div>
          <div className="player">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon icon-shuffle">
              <title>Shuffle</title>
              <path
                shapeRendering="geometricPrecision"
                d="M424.1 287c-9.375-9.375-24.56-9.344-33.94 .0313s-9.375 24.56 0 33.94L430.1 360H332l-58.01-77.34l-29.1 39.99l56.82 75.75C305.3 404.4 312.4 408 320 408h110.1l-39.03 39.03c-9.375 9.375-9.375 24.56 0 33.94C395.7 485.7 401.8 488 408 488s12.27-2.375 16.96-7.062l79.1-79.98c9.375-9.375 9.375-24.6 0-33.97L424.1 287zM24 152h92l58.01 77.34l29.1-39.99L147.2 113.6C142.7 107.6 135.6 104 128 104H24C10.75 104 0 114.8 0 128S10.75 152 24 152zM430.1 152l-39.03 39.03c-9.375 9.375-9.375 24.56 0 33.94C395.7 229.7 401.8 232 408 232s12.28-2.312 16.97-7l79.1-79.98c9.375-9.375 9.374-24.6-.0013-33.97l-79.1-79.98c-9.375-9.375-24.56-9.406-33.93-.0313s-9.375 24.56 0 33.94L430.1 104H320c-7.562 0-14.66 3.562-19.19 9.594L116 360H24C10.75 360 0 370.8 0 384s10.75 24 24 24H128c7.562 0 14.66-3.562 19.19-9.594L332 152H430.1z"
              />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="icon icon-backward icon-larger">
              <title>Back</title>
              <path
                shapeRendering="geometricPrecision"
                d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z"
              />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon icon-pause icon-largest">
              <title>Pause</title>
              <path
                shapeRendering="geometricPrecision"
                d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM224 192V320v32H160V320 192 160h64v32zm128 0V320v32H288V320 192 160h64v32z"
              />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="icon icon-forward icon-larger">
              <title>Forward</title>
              <path
                shapeRendering="geometricPrecision"
                d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 406.453"
              class="icon icon-repeat icon-flip icon-green"
            >
              <title>Repeat</title>
              <path
                fillRule="nonzero"
                shapeRendering="geometricPrecision"
                d="M414.238 63.347h20.374c21.303 0 40.662 8.705 54.67 22.714C503.295 100.073 512 119.442 512 140.735v188.329c0 21.296-8.709 40.655-22.721 54.667s-33.375 22.722-54.667 22.722H77.388c-21.292 0-40.662-8.706-54.674-22.718C8.705 369.727 0 350.368 0 329.064V140.735c0-21.307 8.698-40.666 22.71-54.678s33.368-22.71 54.678-22.71h138.653V14.426C216.041 6.459 222.5 0 230.467 0c3.875 0 7.394 1.527 9.985 4.013l99.797 78.827c6.223 4.914 7.28 13.947 2.366 20.17a14.38 14.38 0 01-2.61 2.559l-100.636 79.489c-6.223 4.914-15.255 3.856-20.169-2.366a14.297 14.297 0 01-3.09-8.902h-.069v-52.737H77.388c-5.386 0-10.304 2.224-13.881 5.801s-5.801 8.498-5.801 13.881v188.329c0 5.38 2.228 10.298 5.805 13.874 3.58 3.58 8.501 5.808 13.877 5.808h357.224c5.368 0 10.29-2.231 13.87-5.811 3.58-3.581 5.812-8.499 5.812-13.871V140.735c0-5.376-2.228-10.297-5.809-13.878-3.576-3.576-8.494-5.804-13.873-5.804h-20.374V63.347z"
              />
            </svg>
          </div>
          <div className="lyrics">
            <div>It's crazy I'm thinking</div>
            <div>Just knowing that the world is round</div>
            <div>Here I'm dancing on the ground</div>
            <div>Am I right side up or upside down</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SwagSong

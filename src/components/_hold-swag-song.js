import React, { useState, useRef } from 'react'
import { ThemeProvider } from 'styled-components'
import tw, { styled } from 'twin.macro'

import { saveAs } from 'file-saver'
import { elementToSVG, inlineResources } from 'dom-to-svg'

import Icons from '../icons'

// -- -- --

const lightTheme = {
  text: '#000000',
  background: '#ffffff',
  sliderBg: '#000000',
  tshirt: 'transparent',
}

const darkTheme = {
  text: '#ffffff',
  background: '#000000',
  sliderBg: '#ffffff',
  tshirt: 'transparent',
}

const themesMap = {
  lightTheme,
  darkTheme,
}

// -- -- --

const Wrapper = styled.div`
  ${tw`relative max-w-xl mx-auto text-lg`}
`

const Background = styled.div`
  ${tw`p-8`}
  font-family: 'Figtree', serif;
`

const Tshirt = styled.div.attrs((props) => ({
  className: 'text-4xl font-semibold tracking-[.06em] mb-2',
}))(
  ({ theme }) => `
  > svg {
    fill: ${theme.colors.tshirt};
  }
  `
)

const Song = styled.div`
  ${tw`p-4`};
  position: absolute;
  top: 60px;
  left: 65px;
  width: 440px;
  scale: 60%;
`
const SongName = styled.div.attrs((props) => ({
  className: 'text-4xl font-semibold tracking-[.06em] mb-2',
}))(
  ({ theme }) => `
    color: ${theme.colors.text};
  `
)

const Band = styled.div.attrs((props) => ({
  className: 'tracking-[.03em] pb-4',
}))(
  ({ theme }) => `
    color: ${theme.colors.text};
  `
)

const Slider = styled.div.attrs((props) => ({
  className: 'relative max-w-full h-16',
}))(
  ({ theme }) => `
    color: ${theme.colors.text};
  `
)

const Track = styled.div.attrs((props) => ({
  className: 'absolute top-0 w-full p-1 my-4 rounded opacity-25',
}))(
  ({ theme }) => `
    background-color: ${theme.colors.sliderBg};
  `
)

const PlayedTrack = styled.div.attrs((props) => ({
  className: `absolute top-0 p-1 my-4 rounded`,
}))(
  ({ theme }) => `
    background-color: ${theme.colors.sliderBg};
  `
)

const CurrentPosition = styled.div.attrs((props) => ({
  className: `absolute top-1 rounded-full p-4 w-[1em]`,
}))(
  ({ theme }) => `
    background-color: ${theme.colors.sliderBg};
  `
)

const MarkerTime = styled.div`
  ${tw`absolute bottom-0 left-0`}
`

const EndTime = styled.div`
  ${tw`absolute bottom-0 right-0`}
`

const Player = styled.div.attrs((props) => ({
  className: 'p-4 flex flex-nowrap justify-between items-center',
}))(
  ({ theme }) => `
    > svg {
      fill: ${theme.colors.sliderBg}
    };
  `
)

const Lyrics = styled.div.attrs((props) => ({
  className: 'py-4 pt-8 text-center leading-6 text-base tracking-[.02em]',
}))(
  ({ theme }) => `
    color: ${theme.colors.text};
  `
)

// -- -- --
// time string MUST be HH:MM::SS format
// return time as seconds (int)
function timeToSeconds(timeAsString) {
  if (!/^[0-5]?[0-9]?:?[0-5]?[0-9]$/.test(timeAsString)) {
    return 0
  }
  return timeAsString.split(':').reduce((acc, time) => 60 * acc + +time)
}

// -- -- --

const SwagSong = () => {
  const [currentTheme, setCurrentTheme] = useState('lightTheme')
  const [currentTShirt, setTShirt] = useState('transparent')
  const theme = { colors: themesMap[currentTheme] }

  function handleShirtColor(value) {
    theme.colors.tshirt = value
    darkTheme.tshirt = value
    lightTheme.tshirt = value
    setTShirt(value)
    console.log(theme)
  }

  const songRef = useRef(null)

  const handleSongCapture = (ref) => {
    if (ref.current === null) {
      return
    }

    // this generates the svg, but the font/ style are missing
    //
    // ---
    const svgDocument = elementToSVG(document.querySelector('#song'))
    const svgString = new XMLSerializer().serializeToString(svgDocument)
    console.log(svgString)
    const svg = svgString
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    saveAs(blob, '_foo.svg')
    // --
  }

  const songName = 'Crush'
  const bandName = 'Dave Matthews Band'
  const songLength = '8:09'
  const songMarker = '4:51'

  const songLengthSeconds = timeToSeconds(songLength)
  const songMarkerSeconds = timeToSeconds(songMarker)
  const percentPlayed = Math.round((songMarkerSeconds / songLengthSeconds) * 100)

  return (
    <Background>
      <ThemeProvider theme={theme}>
        <div>
          <label htmlFor="text-color">Text</label>
          <select id="text-color" value={currentTheme} onChange={(e) => setCurrentTheme(e.target.value)}>
            <option value="darkTheme">Light</option>
            <option value="lightTheme">Dark</option>
          </select>
        </div>
        <div>
          <label htmlFor="shirt-color">Shirt</label>
          <select id="shirt-color" value={currentTShirt} onChange={(e) => handleShirtColor(e.target.value)}>
            <option value="transparent">-</option>
            <option value="#d3d3d3">Light Gray</option>
            <option value="#650317">Maroon</option>
            <option value="#0F3A9E">Royal Blue</option>
            <option value="#F5B2C0">Baby Pink</option>
            <option value="#0f172a">Very Dark Slate</option>
          </select>
        </div>
        <div>
          <button onClick={handleSongCapture}>Get SVG</button>
        </div>
        <Wrapper>
          <Tshirt>
            <Icons name="tshirt" color={currentTShirt} />
          </Tshirt>
          <Song className="light-icons" ref={songRef} id="song">
            <SongName>{songName}</SongName>
            <Band>{bandName}</Band>
            <Slider>
              <PlayedTrack style={{ width: `${percentPlayed}%` }} />
              <CurrentPosition
                style={{
                  marginLeft: `-0.5em`,
                  left: `calc(${percentPlayed === 0 ? `1em` : percentPlayed + `%`} - 0.5em)`,
                }}
              />
              <Track />
              <MarkerTime>{songMarker}</MarkerTime>
              <EndTime>{songLength}</EndTime>
            </Slider>
            <Player>
              <Icons name="shuffle" additionalClasses="" />
              <Icons name="backward-step" additionalClasses="icon-larger" />
              <Icons name="circle-pause" additionalClasses="icon-largest" />
              <Icons name="forward-step" additionalClasses="icon-larger" />
              <Icons name="repeat-square" additionalClasses="icon-vertical-flip icon-green" />
            </Player>
            <Lyrics>
              <div>It's crazy I'm thinking</div>
              <div>Just knowing that the world is round</div>
              <div>Here I'm dancing on the ground</div>
              <div>Am I right side up or upside down</div>
            </Lyrics>
          </Song>
        </Wrapper>
      </ThemeProvider>
    </Background>
  )
}

export default SwagSong

import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import tw, { styled } from 'twin.macro'

import Icons from '../icons'

// -- -- --

const Background = styled.div`
  ${tw`p-8`}
  font-family: 'Figtree', serif;
`
const Tshirt = styled.div`
  ${tw``}
`
const Song = styled.div`
  ${tw`p-4`};
  position: absolute;
  top: 60px;
  left: 65px;
  width: 440px;
  scale: 70%;
`
const SongName = styled.div`
  ${tw`text-4xl font-semibold tracking-[.06em] mb-2`}
`
const Band = styled.div`
  ${tw`tracking-[.03em] pb-4`}
`
const Slider = styled.div`
  ${tw`relative max-w-full h-16`}
`
const Track = styled.div`
  ${tw`absolute top-0 w-full bg-black p-1 my-4 rounded opacity-25`}
`
const PlayedTrack = styled.div`
  ${tw`absolute top-0 bg-black p-1 my-4 rounded`}
  width: ${({ percent = 0 }) => percent}%;
`
const CurrentPosition = styled.div`
  margin-left: -0.5em;
  left: calc(${(props) => (props.percent === 0 ? `1em` : props.percent + `%`)} - 0.5em);
  ${tw`absolute top-1 bg-black rounded-full p-4 w-[1em]`}
`
const MarkerTime = styled.div`
  ${tw`absolute bottom-0 left-0`}
`
const EndTime = styled.div`
  ${tw`absolute bottom-0 right-0`}
`
const Player = styled.div`
  ${tw`p-4 flex flex-nowrap justify-between items-center`}
`
const SongLyrics = styled.div`
  ${tw`py-4 pt-8 text-center leading-6 text-base tracking-[.02em]`}
`

const Wrapper = styled.div`
  ${tw`relative max-w-xl mx-auto text-lg`}
`

// -- -- --

const lightTheme = {
  text: '#151515',
  background: '#ffffff',
}

const darkTheme = {
  text: '#ffffff',
  background: '#151515',
}

const themesMap = {
  lightTheme,
  darkTheme,
}

// const Text = styled.p(
//   ({ theme }) => `
//     color: ${theme.colors.text};
//     background-color:${theme.colors.background};
//   `,
//   `border: 1px dotted orange`
// )

// const Text = styled.p.attrs((props) => ({
//   className: 'text-lg',
// }))`
//   ${tw`border`}
// `

const Text = styled.p.attrs((props) => ({
  className: 'text-lg',
}))(
  ({ theme }) => `
    color: ${theme.colors.text};
    background-color:${theme.colors.background};
  `,
  `border: 1px dotted orange`
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

const SwagSong = () => {
  const [currentTheme, setCurrentTheme] = useState('lightTheme')

  const theme = { colors: themesMap[currentTheme] }

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
        <Text>hello theme!</Text>
        <select value={currentTheme} onChange={(e) => setCurrentTheme(e.target.value)}>
          <option value="lightTheme">Light</option>
          <option value="darkTheme">Dark</option>
        </select>
      </ThemeProvider>
      <Wrapper>
        <Tshirt>
          <Icons name="tshirt" />
        </Tshirt>
        <Song className="light-icons">
          <SongName>{songName}</SongName>
          <Band>{bandName}</Band>
          <Slider>
            <PlayedTrack percent={percentPlayed} />
            <CurrentPosition percent={percentPlayed} />
            <Track />
            <MarkerTime>
              {/* songMarkerSeconds < songLengthSeconds ? songMarkerSeconds : songLengthSeconds */}
              {songMarker}
            </MarkerTime>
            <EndTime>
              {/* songLengthSeconds */}
              {songLength}
            </EndTime>
          </Slider>
          <Player>
            <Icons name="shuffle" additionalClasses="" />
            <Icons name="backward-step" additionalClasses="icon-larger" />
            <Icons name="circle-pause" additionalClasses="icon-largest" />
            <Icons name="forward-step" additionalClasses="icon-larger" />
            <Icons name="repeat-square" additionalClasses="icon-vertical-flip icon-green" />
          </Player>
          <SongLyrics>
            <div>It's crazy I'm thinking</div>
            <div>Just knowing that the world is round</div>
            <div>Here I'm dancing on the ground</div>
            <div>Am I right side up or upside down</div>
          </SongLyrics>
        </Song>
      </Wrapper>
    </Background>
  )
}

export default SwagSong

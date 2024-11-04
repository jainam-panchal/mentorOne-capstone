import React, { useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

const JoinSession = () => {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const meetingContainerRef = useRef(null)

  const famousScientists = [
    'Albert Einstein',
    'Isaac Newton',
    'Marie Curie',
    'Galileo Galilei',
    'Nikola Tesla',
    'Charles Darwin',
    'Stephen Hawking',
    'Richard Feynman',
    'Niels Bohr',
    'Ada Lovelace',
    'Michael Faraday',
    'Johannes Kepler',
    'Leonardo da Vinci',
    'James Clerk Maxwell',
    'Dmitri Mendeleev',
    'Louis Pasteur',
    'Gregor Mendel',
    'Erwin Schrödinger',
    'Werner Heisenberg',
    'Rosalind Franklin',
  ]

  const randomScientist =
    famousScientists[Math.floor(Math.random() * famousScientists.length)]

  const AGORA_APPID = Number(import.meta.env.VITE_AGORA_APPID)
  const AGORA_SERVER_SECRET = import.meta.env.VITE_AGORA_SERVER_SECRET

  const myMeeting = async (element) => {
    const appID = AGORA_APPID
    const serverSecret = AGORA_SERVER_SECRET
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      sessionId,
      Date.now().toString(),
      randomScientist
    )

    const zc = ZegoUIKitPrebuilt.create(kitToken)
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      onLeaveRoom: () => {
        navigate('/')
      },
      config: {
        showHeader: false, // Hide the header
      },
    })
  }

  useEffect(() => {
    if (meetingContainerRef.current) {
      myMeeting(meetingContainerRef.current)
    }
  }, [meetingContainerRef, sessionId])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div ref={meetingContainerRef} className="w-screen h-screen"></div>
    </div>
  )
}

export default JoinSession

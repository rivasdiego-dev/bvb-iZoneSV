import React from 'react'
import Title from '../Title'

type Props = {
  eventID: string
}

export default function GamesForm({ eventID }: Props) {
  return (
    <div>
      <Title> Juegos en fase de grupos </Title>
    </div>
  )
}
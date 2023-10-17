import React from 'react'
import LoginForm from '../../components/login/LoginForm'
import { Container } from "@mui/material"
export const Login = () => {
  return (
    <Container style={{ position: "absolute", left: "50%", top: "55%", transform: "translate(-50%,-50%)" }} maxWidth={"sm"}>
      <LoginForm />
    </Container>
  )
}
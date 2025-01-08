
import { Container } from "@mui/material";
import React from "react";

export default function AboutPage(props: any) {

  const data = {
    title: 'About',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }

  const renderAboutContent = (
    <React.Fragment>
      <p>{props.title ?? data.title}</p>
      <p>{props.about ?? data.body}</p>
    </React.Fragment>
  )

  return (
    <Container maxWidth="md" component={'main'} sx={{ mt: 10 }}>
      {renderAboutContent}
    </Container>
  )
}

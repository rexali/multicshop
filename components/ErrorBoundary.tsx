'use client'

import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";


type Props = { children: React.ReactNode };
type State = { hasError: boolean, error: Error, reset: () => void }

export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            hasError: false,
            error: new Error(),
            reset: () => { }
        }
    }

    static getDerivedStateFromError(error: any) {

        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log(error, errorInfo);
        this.setState({
            error
        })

    }

    render(): React.ReactNode {

        if (this.state.hasError) {

            return (
                <Container maxWidth={'md'} component={'main'}>
                    <Box sx={{ minHeight: 420, display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2>Something went wrong</h2><br />
                        <p style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}><span>Name:</span> {this.state.error.name}</p><br />
                        <p style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}><span>Message:</span> {this.state.error.message}</p><br />
                        <Button
                            size="large"
                            variant='contained'
                            onClick={() => this.state.reset()}
                        >
                            Try again
                        </Button>
                    </Box>
                </Container>
            )
        }

        return this.props.children
    }


}
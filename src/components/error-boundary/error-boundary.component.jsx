import React from 'react';

import NotFound from '../../pages/notfound/notfound.component';

import './error-boundary.styles.scss';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError() {
        return {
            hasError: true
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        if(this.state.hasError) {
            return (
                <NotFound />
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary;
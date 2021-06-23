import React from 'react';
import styles from './../index.css';

export class ErrorComponent extends React.Component {
    state = {
        hasError: false,
        message: '',
    }

    componentDidCatch(error) {
        this.setState({
            hasError: true,
            message: error.message,
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.error}>
                    {this.state.message}
                </div>
            );
        }

        return this.props.children;
    }
}

export const withError = (Component) => {
    class ErrorComponent extends React.Component {
        state = {
            hasError: false,
            message: '',
        }

        componentDidCatch(error) {
            this.setState({
                hasError: true,
                message: error.message,
            });
        }

        retry = () => {
            this.setState({
                hasError: false,
                message: '',
            });
        }

        render() {
        
            if (this.state.hasError) {
                return (
                    <div className={styles.error}>
                        {this.state.message}
                        <button
                            onClick={this.retry}
                        >
                            Retry
                        </button>
                    </div>
                );
            }

            return <Component {...this.props} />;
        }
    }

    ErrorComponent.displayName = `withError(${Component.displayName || Component.name})`;

    return ErrorComponent;
};
import React from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends React.Component{
    state = {
        authenticatedUser: false
    }
    constructor() {
        super();
        this.data = new Data();
        this.cookie = Cookies.get('authenticatedUser');
        this.state = {
            authenticatedUser: this.cookie ? 
            JSON.parse(this.cookie) :
            null,
        };
    }

    render() {
        const {authenticatedUser} = this.state;

        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
            },
        };
        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    signIn = async(username, password) => {
        const user = await this.data.getUser(username, password);
        user.password = password;
        if (user !== null) {
            this.setState(() => {
                return {
                    authenticatedUser: user
                };
            });

            //set cookie
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
        }
        return user

    }
    signOut = () => {
        //removes the name and username props from state
        this.setState({ authenticatedUser: null });
        Cookies.remove('authenticatedUser');
    };

}

export const Consumer = Context.Consumer;

     /**
     * A higher-order component that wraps the provided component in a Context Consumer component.
     * @param {class} Component - A React component.
     * @returns {function} A higher-order component.
     */

     export default function withContext(Component) {
        return function ContextComponent(props) {
          return (
            <Context.Consumer>
              {(context) => (
                <Component
                  {...props}
                  context={context}
                />
              )}
            </Context.Consumer>
          );
        };
      }
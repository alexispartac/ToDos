import * as React from "react"
import { useCookies} from 'react-cookie'
import { User } from "src/@types/user"

type ConnectUserProps = {
    token: { user? : any},
    user : User,
    setUser : any
    handleLogin : (token : string) => void
    handleLogout : () => void
}

const ConnectUser = (): ConnectUserProps => {
    const [token, setToken, removeToken] = useCookies(['user'])
    const [user, setUser] = React.useState<User>(
        {
            username: '',
            password: ''
        }
    )
    
    function handleLogin(accessToken: string) {
        setToken('user', accessToken, { path: '/' });
    }

    function handleLogout() {
        removeToken('user');
    }
    
    return {
        token,
        user,
        setUser,
        handleLogin,
        handleLogout
    }
    
}

export default ConnectUser;
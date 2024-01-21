import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { collection, query, onSnapshot } from "firebase/firestore"
import { db } from './firebase'

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const [admin, setAdmin] = useState(null);
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  const handleAdmin = async () => {
    const q = query(collection(db, 'admin'));

    await onSnapshot(q, (querySnapshot) => {
      setAdmin(querySnapshot.docs.map(doc => ({
        id: doc.ref._key.path.segments.slice(-1)[0],
        avatar: '/assets/avatars/avatar-marcus-finn.png',
        name: 'Admin',
        email: doc.data().email,
        password: doc.data().password,
      })))
    })
  }

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;
    let adminData;
    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }
    
    if (isAuthenticated) {
      adminData = window.sessionStorage.getItem('admin');
      // const user = {
      //   id: '5e86809283e28b96d2d38537',
      //   avatar: '/assets/avatars/avatar-marcus-finn.png',
      //   name: 'Anika Visser',
      //   email: 'anika.visser@devias.io'
      // };
      setAdmin(adminData)
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: adminData
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
      handleAdmin();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-marcus-finn.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signIn = async (email, password) => {
    if (email !== admin[0].email || password !== admin[0].password) {
      throw new Error('Please check your email and password');
    }

    try {
      window.sessionStorage.setItem('authenticated', 'true');
      window.sessionStorage.setItem('admin', admin[0]);
    } catch (err) {
      console.error(err);
    }

    // const user = {
    //   id: '5e86809283e28b96d2d38537',
    //   avatar: '/assets/avatars/avatar-marcus-finn.png',
    //   name: 'Anika Visser',
    //   email: 'anika.visser@devias.io'
    // };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: admin?.[0]
    });
  };

  const signUp = async (email, name, password) => {
    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'false');
      window.sessionStorage.removeItem('admin');
    } catch (err) {
      console.error(err);
    }
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut,
        admin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);

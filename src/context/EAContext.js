import React, {
  useContext, useState, useEffect, useMemo,
} from 'react';
import { useConnected } from './ConnectionContext';
import { useMyDataApi } from './ApiContext';
import { useRaiseError } from './ErrorContext';
import TypeFilter from '../Services/Filters/TypeFilter';
import { documentTypes } from '../Common/Config';

const EAContext = React.createContext();
const EADispatchContext = React.createContext();

const EAProvider = ({ children }) => {
  const [eaDoc, setEADoc] = useState(null);
  const connected = useConnected();
  const myDataApi = useMyDataApi();
  const raiseError = useRaiseError('EAProvider');

  useEffect(() => {
    let cancel = false;
    const getEADoc = async () => {
      if (!connected || !myDataApi) return;
      try {
        const eaFilter = new TypeFilter(documentTypes.ea);
        const ea = await myDataApi.loadAll(null, eaFilter);
        if (cancel) return;
        setEADoc(ea.docs[0]);
      } catch (err) {
        raiseError(err);
      }
    };

    getEADoc();

    return () => {
      cancel = true;
    };
  }, [myDataApi, connected, raiseError]);

  const userEADispatch = useMemo(
    () => ({
      // No current implementation.
    }), [],
  );

  return (
    <EAContext.Provider value={{ eaDoc }}>
      <EADispatchContext.Provider value={userEADispatch}>
        {children}
      </EADispatchContext.Provider>
    </EAContext.Provider>
  );
};

const useEA = () => {
  const context = useContext(EAContext);
  if (context === undefined) {
    throw new Error('useEA must be used within a EAProvider');
  }
  const { eaDoc } = context;
  return eaDoc;
};

export {
  EAContext, EAProvider, useEA,
};

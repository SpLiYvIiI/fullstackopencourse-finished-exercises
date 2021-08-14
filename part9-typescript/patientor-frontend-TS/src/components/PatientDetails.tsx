import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import {addEntry, useStateValue} from '../state'
import EntryDetails from './EntryDetails'
import AddEntryModal from '../AddEntryModal'
import {Icon, CardGroup, Button} from 'semantic-ui-react'
import { Entry, EntryTypes, Patient } from '../types';
import { apiBaseUrl } from '../constants'
import axios from 'axios'
const PatientDetails : React.FC= () =>{
    const id  =  Number(useParams<{ id: string }>().id);
    const [{ patients }, dispatch] = useStateValue();
    const patient: Patient | undefined = Object.values(patients).find((patient : Patient) => patient.id === id )
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const [entryType, setEntryType] = useState<EntryTypes | undefined>(undefined)
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setEntryType(undefined)
      setModalOpen(false);
      setError(undefined);
    };
    const SubmitNewEntry  = async (values : unknown) =>{
        try {
            const { data: newEntry } = await axios.post<Entry>(
              `${apiBaseUrl}/patients/${id}/entries`,
              values
            );
            dispatch(addEntry(newEntry,id));
            closeModal();
          } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
        closeModal();
    }
    if(!patient) return null
    else{
    const gender = patient.gender === 'female' ? 'venus': patient.gender === 'male' ? 'mars' : 'genderless';
    return(
        <div>
            <h1>{patient.name} <Icon className={gender}></Icon></h1> 
            <p>ssn:{patient.ssn}</p>
            <p>occupation:{patient.occupation}</p>
            <AddEntryModal
             modalOpen={modalOpen}
             onSubmit={SubmitNewEntry}
             error={error}
             onClose={closeModal}
             entryType={entryType}
             setEntryType={setEntryType}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
            <h2>entries</h2>
            <CardGroup>
            {patient.entries.map(entry => {
              return <EntryDetails key={entry.id} entry={entry}/>
            })}
            </CardGroup>
        </div>
    )
    }
}

export default PatientDetails
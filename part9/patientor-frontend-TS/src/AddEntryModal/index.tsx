import React from 'react';
import { Dropdown, DropdownProps, Modal, Segment } from 'semantic-ui-react';
import { EntryTypes } from '../types';
import AddEntryForm from './AddEntryForm'

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: unknown) => void;
  error?: string;
  entryType : EntryTypes | undefined;
  setEntryType : React.Dispatch<React.SetStateAction<EntryTypes | undefined>>
}
const options = [
  { key: 'HealthCheck', text: 'Health check', value: 'HealthCheck' },
  { key: 'Hospital', text: 'Hospital', value: 'Hospital' },
  { key: 'OccupationalHealthcare', text: 'Occupational health care', value: 'OccupationalHealthcare' },
]


const AddEntryModal = ({ modalOpen, onClose, onSubmit, error , entryType, setEntryType}: Props) => {
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setEntryType(data.value as EntryTypes);
  };
  return(
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <label>Type</label>
      <Dropdown 
      placeholder='Select entry type' 
      fluid
      selection
      options={options} 
      onChange={onChange}
      />
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} entryType={entryType}/>
    </Modal.Content>
  </Modal>
  )
};

export default AddEntryModal;
import { Table, Thead, Tbody, Tr, Th, Td, Button, Switch, useToast } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { getAllEvents, setEventInfo } from '../../api/api';
import AuthContext from '../../context/AuthContext';

const EventTable = () => {
  const [tableData, setTableData] = useState([]);

  const toast = useToast();
  const { authentication } = useContext(AuthContext);

  useEffect(() => {
    getAllEvents(authentication.token).then(response => {
      setTableData(response)
      console.log(response)
    }).catch((error) => {
        console.error('Error fetching data:', error);
    });
  }, [authentication.token]);

  // eslint-disable-next-line no-unused-vars
  const handleDelete = (id) => {
    toast({
      title: 'Error',
      description: `Not Implemented`,
      status: 'error',
      duration: 4000,
      isClosable: true,
    });
  };

  const handleVisibilityToggle = (id, visible) => {
    setEventInfo(authentication.token, {
      "visible": {
        "id": id,
        "value": visible,
      }
    }).then(() => {
      toast({
        title: 'Success',
        description: `Event was updated successfully!`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    })
      .catch((err) => {
        toast({
          title: 'Error',
          description: `Update could not be saved! ${err}`,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      });
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Shortname</Th>
          <Th>Visible</Th>
          <Th>Delete</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tableData.map((rowData) => (
          <Tr key={rowData.id}>
            <Td>{rowData.name}</Td>
            <Td>{`${rowData.type  }${  rowData.edition}`}</Td>
            <Td>
              <Switch
                size="md"
                defaultChecked={rowData.visible}
                onChange={(e) => handleVisibilityToggle(rowData.id, e.target.value)}
              />
            </Td>
            <Td>
              <Button onClick={() => handleDelete(rowData.id)}>Delete</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default EventTable;

import { useRef, useState } from 'react';
import './App.css';
import { Button, Table, Modal, Input } from 'antd';
import {
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon
} from "@ant-design/icons";

type TableColumn = {
  key: string,
  title: string,
  dataIndex?: string,
  render?: any
}

type DataSource = {
  id: number,
  name: string,
  email: string,
  address: string
}

function App() {

  const [tempPerson, setTempPerson] = useState<DataSource>();

  const [editModal, setEditModal] = useState(false);
  
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "Shourov",
      email: "shourov@gmail.com",
      address: "Dhaka"
    },
    {
      id: 2,
      name: "Foisal",
      email: "foisal@gmail.com",
      address: "Pabna"
    },
    {
      id: 3,
      name: "Yeasir",
      email: "yeasir@gmail.com",
      address: "Mirpur"
    },
    {
      id: 4,
      name: "Arafat",
      email: "arafat@gmail.com",
      address: "Uttara"
    },
  ]);

  const columns: TableColumn[] = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id"
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name"
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email"
    },
    {
      key: "4",
      title: "Address",
      dataIndex: "address"
    },
    {
      key: "5",
      title: "Actions",
      render: (record: DataSource) => <>

        <EditIcon onClick={() => { onEdit(record) }} style={{color: "blue", cursor: "pointer"}} />
        <DeleteIcon 
          onClick={() => { onDeletion(record) }} 
          style={{color: "red", marginLeft: "1rem", cursor: "pointer"}} 
        />
      </>
    }
  ];

  const onAddition = () => {

    const newData: DataSource = {
      id: Math.round(Math.random()*100),
      name: "Dummy",
      email: "DummyEmail",
      address: "DummyAddress"
    }

    setDataSource(prev => [...prev, newData]);
  }

  const onDeletion = (record: DataSource) => {
    Modal.confirm({
      title: "Sure to delete?",
      okText: "Sure!",
      okType: "danger",
      cancelText: "No Thanks",
      onOk: () => {
        setDataSource((prev: DataSource[]) => {
          return prev.filter((data: DataSource) => {
            return data.id!==record.id
          })
        });
      }
    });
  }

  const onEdit = (record: DataSource) => {
    setEditModal(true);
    setTempPerson(record);
  }

  return (
    <>
      <div className="App">
        <header className='App-header'>
          <Button onClick={onAddition}>Add New</Button>
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey={"id"}
          />
          <Modal
            title="Edit Person"
            open={editModal}
            onCancel={() => {setEditModal(false); setTempPerson(null)}}
            onOk={() => {
              setEditModal(false);
              setDataSource
            }}
          >
            <Input 
              value={tempPerson?.name} 
              onChange={(e) => setTempPerson((prev: DataSource) => {
                return {...prev, name: e.target.value}
              })} 
            />
            <Input 
              value={tempPerson?.email} 
              onChange={(e) => setTempPerson((prev: DataSource) => {
                return {...prev, email: e.target.value}
              })} 
            />
            <Input 
              value={tempPerson?.address} 
              onChange={(e) => setTempPerson((prev: DataSource) => {
                return {...prev, address: e.target.value}
              })} 
            />
          </Modal>
        </header>
      </div>
    </>
  )
}

export default App

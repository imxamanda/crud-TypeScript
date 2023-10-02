import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { http } from '@/services/Api';
import { IUsuario } from '@/type/Usuario';
import { FiEdit } from 'react-icons/fi';
import { BsTrash3 } from 'react-icons/bs';
import Link from 'next/link';

const Usuarios = () => {

    const [usuarios, setUsuarios] = useState<IUsuario[]>([])

    useEffect(() => {
        http.get('/users').then(resultado => {
            setUsuarios(resultado.data)
        })
    }, [])

    console.log(usuarios)
    function excluirUsuario(id: number) {
      try {
        http.delete(`users/${id}`).then(resultado => {
          console.log(resultado)
          setUsuarios(usuarios => usuarios.filter(usuario => usuario.id !== id))
      })
      } catch(error) {
        console.log(error)
      }
    }

  return (
    <>
      <Navbar expand="lg" className="bg-body-secondary">
      <Container>
        <Navbar.Brand href="#home">Crud - TS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/usuarios">Usuários</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Container>
    <Link href="/usuarios/form" className='mb-2 btn btn-primary'>
                Novo
    </Link>

        <Table striped bordered hover variant="dark">
                  <thead>
                      <tr>
                          <th></th>
                          <th>ID</th>
                          <th>Primeiro Nome</th>
                          <th>Último nome</th>
                          <th>Email</th>
                      </tr>
                  </thead>
                  <tbody>
                      {usuarios?.map((item) => (
                          <tr key={item.id}>
                              <td>
                                  <Link href={'/usuarios/' + item.id}> <FiEdit className='text-primary' /></Link>
                                  <BsTrash3 onClick={() => excluirUsuario(item.id)} className='text-danger me-4' /> 
                              </td>
  
                              <td>{item.id}</td>
                              <td>{item.firstName}</td>
                              <td>{item.lastName}</td>
                              <td>{item.email}</td>
                          </tr>
                      ))}
  
                  </tbody>
              </Table>
        </Container>
    </>
  
  )
}

export default Usuarios
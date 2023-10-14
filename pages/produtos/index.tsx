import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { http } from '@/services/Api';
import { IProdutos } from '@/type/Produtos';
import { FiEdit } from 'react-icons/fi';
import { BsTrash3 } from 'react-icons/bs';
import Link from 'next/link';

const Produtos = () => {

    const [produtos, setProdutos] = useState<IProdutos[]>([])

    useEffect(() => {
        http.get('/products').then(resultado => {
            setProdutos(resultado.data)
        })
    }, [])

    console.log(produtos)
    function excluirProduto(id: number) {
      try {
        http.delete(`users/${id}`).then(resultado => {
          console.log(resultado)
          setProdutos(produtos => produtos.filter(produtos => produtos.id !== id))
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
            <Nav.Link href="/produtos">Produtos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Container>
    <Link href="/produtos/form" className='mb-2 btn btn-primary'>
                Novo
    </Link>

        <Table striped bordered hover variant="dark">
                  <thead>
                      <tr>
                          <th></th>
                          <th>ID</th>
                          <th>Nome</th>
                          <th>Categoria</th>
                          <th>Preço</th>
                      </tr>
                  </thead>
                  <tbody>
                      {produtos?.map((item) => (
                          <tr key={item.id}>
                              <td>
                                  <Link href={'/produtos/' + item.id}> <FiEdit className='text-primary' /></Link>
                                  <BsTrash3 onClick={() => excluirProduto(item.id)} className='text-danger me-4' /> 
                              </td>
  
                              <td>{item.id}</td>
                              <td>{item.nome}</td>
                              <td>{item.categoria}</td>
                              <td>{item.preco}</td>
                          </tr>
                      ))}
  
                  </tbody>
              </Table>
        </Container>
    </>
  
  )
}

export default Produtos
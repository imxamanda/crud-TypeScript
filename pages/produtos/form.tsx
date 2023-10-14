import Link from 'next/link'
import React from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
//import { IProdutos } from '@/type/Produtos'
import { http } from '@/services/Api'
import 'bootstrap/dist/css/bootstrap.min.css';

const FormularioCadastro = () => {
    
    const { push } = useRouter()
    const { register, handleSubmit } = useForm()

    function salvarNovoProduto(dados: any) {
        try {
            http.request({
                url: '/products',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dados
        })
        push('/produtos')
        } catch(error) {
            console.log(error)  
        }}

  return (
    <>
          <Navbar expand="lg" className="bg-body-secondary">
            <Container>
                <Navbar.Brand href="#home"> Crud - TS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/produtos">Produtos</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
    <Container>
             <Form>

                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Nome: </Form.Label>
                    <Form.Control type="text" {...register('title')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Categoria: </Form.Label>
                    <Form.Control type="text" {...register('category')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Preço: </Form.Label>
                    <Form.Control type="text" {...register('price')} />
                </Form.Group>

                <div className='text-center'>
                    <Button variant="success" onClick={handleSubmit(salvarNovoProduto)}>
                        
                        Salvar
                    </Button>
                    <Link className="ms-2 btn btn-danger" href="/produtos">
                        
                        Voltar
                    </Link>
                </div>
            </Form>
    </Container>

    
    </>
  )
}

export default FormularioCadastro
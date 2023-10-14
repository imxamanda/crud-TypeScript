import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import Link from 'next/link'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { http } from '@/services/Api'
import 'bootstrap/dist/css/bootstrap.min.css';

const EditarFormulario = () => {
    const { push, query } = useRouter()
    const { register, handleSubmit, setValue } = useForm()
    
    useEffect(() => {
        if(query.id){
            const id = query.id
            http.get(`products/${id}`).then(resultado => {
              const dados = resultado.data

              for(let atributo in dados){
                setValue(atributo, dados[atributo])
            }
            })
        }
    }, [query.id])

    function editarProduto(dados: any) {
      try {
        http.put(`/products/${query.id}`, {
            title: dados.title,
            category: dados.category,
            price: dados.price
        })
        push('/produtos')
    } catch(error) {
        console.log(error)  
    }}


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
                    <Button variant="success" onClick={handleSubmit(editarProduto)}>
                        <BsCheckLg className="me-2" />
                        Salvar
                    </Button>
                    <Link className="ms-2 btn btn-danger" href="/produtos">
                        <AiOutlineArrowLeft className="me-2" />
                        Voltar
                    </Link>
                </div>
            </Form>
    </Container>
    </>
  )
}

export default EditarFormulario
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
            http.get(`users/${id}`).then(resultado => {
              const dados = resultado.data

              for(let atributo in dados){
                setValue(atributo, dados[atributo])
            }
            })
        }
    }, [query.id])

    function editarUsuario(dados: any) {
      try {
        http.put(`/users/${query.id}`, {
          firstName: dados.firstName,
          lastName: dados.lastName,
          email: dados.email
        })
        push('/usuarios')
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
                    <Nav.Link href="/usuarios">Usuários</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
    <Container>
             <Form>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>Nome: </Form.Label>
                    <Form.Control type="text" {...register('firstName')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Sobrenome: </Form.Label>
                    <Form.Control type="text" {...register('lastName')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type="text" {...register('email')} />
                </Form.Group>

                <div className='text-center'>
                    <Button variant="success" onClick={handleSubmit(editarUsuario)}>
                        <BsCheckLg className="me-2" />
                        Salvar
                    </Button>
                    <Link className="ms-2 btn btn-danger" href="/cursos">
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
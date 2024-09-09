import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

type InfoProps = {
  show: boolean 
	onHide: () => void
}

export default function Info({show, onHide}: InfoProps) {
	return (
		<Modal show={show} onHide={onHide} animation={true}>
			<Modal.Header closeButton className="blackmodal" closeVariant="white">
				<Modal.Title>Info</Modal.Title>
			</Modal.Header>
			<Modal.Body className="blackmodal">
				<img src={require("./icon_512.png")} alt="Logo" className="infoImage"/>
				<p className="infoP">this is a text manipulation app by jörg piringer</p>
				<p className="infoP">check out my website: <a href="https://joerg.piringer.net">https://joerg.piringer.net</a></p>
				<p className="infoP">or fork this app on github: <a href="https://github.com/jpiringer/xtxt-online">https://github.com/jpiringer/xtxt-online</a></p>
			</Modal.Body>
			<Modal.Footer className="blackmodal">
				<Button variant="primary" onClick={onHide}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
import React from 'react'

import {Modal, ModalHeader, ModalBody, ModalFooter} from  'reactstrap'
import Button from "components/general/Button";

import {BiArrowBack} from 'react-icons/bi'

const ModalComp = ({className,  isOpen, setIsOpen, children}) => {
    return (
        <Modal color="dark" isOpen={isOpen} toggle={setIsOpen} className={className} centered>
          <ModalHeader toggle={setIsOpen} charCode="">Details:</ModalHeader>
          <ModalBody>
              {children}
          </ModalBody>
          <ModalFooter>

          <Button text="Back" Icon={BiArrowBack} button="B" onPress={()  => setIsOpen(false)} />
          </ModalFooter>
        </Modal>
    )
}

export default ModalComp

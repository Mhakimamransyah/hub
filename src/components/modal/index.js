import { ModalContent, ModalOverlay, Modal } from "@chakra-ui/react";

export default function CustomModal({ content, isOpen, onClose }) {
    return (
        <Modal isCentered={true} size={"xs"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                {content}
            </ModalContent>
        </Modal>
    );
}
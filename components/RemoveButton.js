import React, { useState } from 'react';
import { mutate, trigger } from 'swr';
import { useAuth } from '@/lib/auth';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  IconButton
} from '@chakra-ui/core';
import { deleteFeedback } from '@/lib/db';

const RemoveButton = ({ feedbackId }) => {
  const [isOpen, setIsOpen] = useState();
  const cancelRef = React.useRef();
  const onClose = () => setIsOpen(false);
  const auth = useAuth();
  const onDelete = () => {
    deleteFeedback(feedbackId);
    /**
      Need to remove the swr cache also
     */
    mutate(
      ['/api/feedback', auth.user.token],
      async (data) => {
        const filtered = data.feedback.filter(
          (feedback) => feedback.id !== feedbackId
        );

        return { feedback: filtered };
      },
      false
    );
    onClose();
    // trigger(['/api/feedback', auth.user.token]);
  };

  return (
    <>
      <IconButton
        aria-label="Delete feedback"
        icon="delete"
        variant="ghost"
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Customer
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor="red" onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RemoveButton;

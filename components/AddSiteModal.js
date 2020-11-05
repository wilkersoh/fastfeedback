import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  useToast
} from '@chakra-ui/core';

import { createSite } from '@/lib/db';
import { useAuth } from '../lib/auth';

const toastModal = (toast, status) => {
  return toast({
    title: 'Account created.',
    description: "We've created your account for you.",
    status,
    duration: 5000,
    isClosable: true
  });
};

const AddSiteModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();
  const auth = useAuth();
  const { handleSubmit, register, errors } = useForm();

  const onCreateSite = ({ name, link }) => {
    if (!name || !link) toastModal(toast, 'error');
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      link
    };
    const { id } = createSite(newSite);
    toastModal(toast, 'success');
    mutate(
      ['/api/sites', auth.user.token],
      async (data) => {
        // aysnc data 是 api return 的data
        return { sites: [{ id, ...newSite }, ...data.sites] };
      },
      false // 它会直接拿cache里的 data， 然后 api 更新好了 他不会refresh
      /**
        Flow:
        1. 用 cache的data
        2. user create 新的site了 它会call api 去 update database
        3. 它还会把 这个data 加 进去 cache data 那边 然后直接显示在 screen(所以看到的data其实是 cache data 而不是 database，除非user refresh)
        4. false - 是说 database data更改了 页面不会 更新， 如果没有设置 当database被更改了 他也会自动更新
        5. 因为 使用cache的data 所以不必要 自动更新
       */
    );
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeigh="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{ bg: 'gray.800', transform: 'scale(0.95' }}
      >
        {children}
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="medium">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                placeholder="Name"
                ref={register({ required: 'Required' })}
              />
              {errors.name && errors.name.message}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                name="link"
                ref={register({ required: 'Required' })}
                placeholder="https://website.com"
              />
              {errors.link && errors.link.message}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button backgroundColor="#99FFFE" color="#1944D4C" type="submit">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;

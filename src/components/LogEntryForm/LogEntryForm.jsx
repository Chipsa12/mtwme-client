import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../UI/button/Button'
import { createdLog } from '../../actions/log';
import {useForm} from 'react-hook-form';

import './LogEntryForm.css'

const LogEntryForm = ({ location, onClose }) => {
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

  const onSubmit = (data) => {
    try {
        data.latitude = location.latitude;
        data.longitude = location.longitude;
        dispatch(createdLog(currentUser.id, data));
        onClose();
    } catch (error) {
        setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error && <span>{error}</span>}
      <label htmlFor="title">Название места</label>
      <input name="title" required {...register("title")} />
      <label htmlFor="description">Описание</label>
      <textarea name="description" rows={3} {...register("description")} required></textarea>
      <label htmlFor="visitDate">Дата визита</label>
      <input name="visitDate" type="date" required {...register("visit")} />
      <Button>Создать метку</Button>
    </form>
  );
};

export default LogEntryForm;
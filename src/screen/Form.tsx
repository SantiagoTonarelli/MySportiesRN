import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, ScrollView, StyleSheet} from 'react-native';
import {
  Button,
  useTheme,
  Text,
  TextInput,
  Title,
  ActivityIndicator,
} from 'react-native-paper';
import {DatePickerModal, TimePickerModal} from 'react-native-paper-dates';
import moment from 'moment';

import {StackParams} from '../navegations/StackNavigator';
import {useForm} from '../hooks/useForm';
import {ActivitiesContext} from '../context/ActivitiesContext';

interface Props extends StackScreenProps<StackParams, 'Formulario'> {}

const Form = ({route, navigation}: Props) => {
  const {colors} = useTheme();
  const {activity} = route.params;
  const {ci, name, onChange, reset} = useForm({
    name: '',
    ci: '',
  });
  const {startAddActivity, finishAdd, loading} = useContext(ActivitiesContext);

  const [datepicker, setDatepicker] = useState<Date | undefined>(undefined);
  const [date, setDate] = useState<moment.Moment | undefined>(undefined);
  const [time, setTime] = useState('0:00');
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const [errorName, setErrorName] = useState(false);
  const [errorCi, setErrorCi] = useState(false);
  const [helperCiText, setHelperCiText] = useState(
    'Ingrese su CI sin puntos ni guión',
  );
  const [helperDateText, setHelperDateText] = useState('');
  const [errorDate, setErrorDate] = useState(false);
  const [helperMomentText, setHelperMomentText] = useState('');
  const [errorMoment, setErrorMoment] = useState(false);

  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  useEffect(() => {
    !finishAdd && navigation.navigate('Actividades');
  }, [finishAdd]);

  const onSubmit = () => {
    if (isFormValid()) {
      const dateToString = date + ' ' + time;
      const dateFormat = moment(dateToString, 'DD/MM/yyyy HH:mm').toDate();
      const activityData = {
        activity,
        name,
        ci,
        date: dateFormat,
      };
      reset();
      startAddActivity(activityData);
    }
  };

  const isFormValid = () => {
    let isValid = true;

    if (!name || name.trim().length === 0) {
      setErrorName(true);
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(name.trim())) {
      setErrorName(true);
      isValid = false;
    } else {
      setErrorName(false);
    }
    if (!ci || ci.trim().length === 0) {
      setErrorCi(true);
      setHelperCiText('La cédula es requerida');
      isValid = false;
    } else if (
      (ci.trim().length !== 7 && ci.trim().length !== 8) ||
      !/^\d{7,8}$/.test(ci.trim())
    ) {
      setErrorCi(true);
      setHelperCiText('La cédula no es válida');
      isValid = false;
    } else {
      setErrorCi(false);
      setHelperCiText('Ingrese su CI sin puntos ni guión');
    }
    const isValidDate = date?.isAfter(moment());
    if (!date || !isValidDate) {
      setHelperDateText('La fecha debe ser posterior al día actual');
      setErrorDate(true);
      isValid = false;
    } else {
      setHelperDateText('');
      setErrorDate(false);
    }
    const startTime = moment('08:00', 'HH:mm');
    const endTime = moment('22:00', 'HH:mm');
    const isValidTime =
      moment(time, 'HH:mm').isSameOrAfter(startTime) &&
      moment(time, 'HH:mm').isSameOrBefore(endTime);
    if (!time || !isValidTime) {
      setHelperMomentText('La hora debe estar entre las 08:00 y 22:00');
      setErrorMoment(true);
      isValid = false;
    } else {
      setHelperMomentText('');
      setErrorMoment(false);
    }

    return isValid;
  };

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    params => {
      setOpen(false);
      setDatepicker(params.date);
      setDate(moment(params.date, 'DD/MM/yyyy'));
    },
    [setOpen, setDate],
  );

  const onConfirm = React.useCallback(
    ({hours, minutes}) => {
      setVisible(false);
      setTime(`${hours}:${minutes}`);
    },
    [setVisible, setTime],
  );

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <View style={styles.center}>
          <Title
            style={{
              color: colors.primary,
              padding: 10,
              textAlign: 'center',
            }}>
            Seleccione una actividad
          </Title>
          <TextInput
            label="Ingrese su nombre (solo letras)"
            onChangeText={value => onChange(value, 'name')}
            value={name}
            style={styles.textInput}
            error={errorName}
          />
          <TextInput
            label={helperCiText}
            onChangeText={value => onChange(value, 'ci')}
            value={ci}
            style={styles.textInput}
            error={errorCi}
          />
          <Button
            style={styles.button}
            onPress={() => setOpen(true)}
            uppercase={false}
            mode="outlined">
            Fecha
          </Button>
          {errorDate && <Text style={{color: 'red'}}>{helperDateText}</Text>}
          <DatePickerModal
            // locale={'en'} optional, default: automatic
            mode="single"
            visible={open}
            onDismiss={onDismissSingle}
            date={datepicker}
            onConfirm={onConfirmSingle}
          />
          <Button
            style={styles.button}
            onPress={() => setVisible(true)}
            uppercase={false}
            mode="outlined">
            Hora
          </Button>
          {errorMoment && (
            <Text style={{color: 'red'}}>{helperMomentText}</Text>
          )}
          <TimePickerModal
            visible={visible}
            onDismiss={onDismiss}
            onConfirm={onConfirm}
            hours={12} // default: current hours
            minutes={14} // default: current minutes
            label="Select time" // optional, default 'Select time'
            cancelLabel="Cancel" // optional, default: 'Cancel'
            confirmLabel="Ok" // optional, default: 'Ok'
            animationType="fade" // optional, default is 'none'
            locale={'en'} // optional, default is automically detected by your system
          />

          <Button
            style={{
              backgroundColor: colors.primary,
              margin: 10,
            }}
            mode="contained"
            onPress={() => onSubmit()}>
            <Text
              style={{
                color: '#FFFFFF',
              }}>
              Agendar
            </Text>
          </Button>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
    justifyContent: 'center',
    width: 320,
    height: 70,
    margin: 10,
    backgroundColor: 'transparent',
  },
  button: {
    justifyContent: 'center',
    marginVertical: 20,
  },
});

export default Form;

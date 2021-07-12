import React, {useContext} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {useWindowDimensions} from 'react-native';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Card, Title, useTheme} from 'react-native-paper';
import {activities} from '../data/activitiesData';
import {StackParams} from '../navegations/StackNavigator';
import {ActivitiesContext} from '../context/ActivitiesContext';

interface Props extends StackScreenProps<StackParams, 'Actividades'> {}

const Activities = ({navigation}: Props) => {
  const {width} = useWindowDimensions();
  const {colors} = useTheme();
  const {startFormAddActivity} = useContext(ActivitiesContext);

  return (
    <View style={styles.center}>
      <FlatList
        ListHeaderComponent={() => (
          <Title
            style={{
              color: colors.primary,
              padding: 5,
              textAlign: 'center',
            }}>
            Seleccione una actividad
          </Title>
        )}
        data={activities}
        key={Math.floor(width / 320)}
        keyExtractor={a => a.img + a.title}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              startFormAddActivity();
              navigation.navigate('Formulario', {
                activity: item,
              });
            }}>
            <Card style={styles.card}>
              <Card.Cover source={item.img} style={styles.cover} />
              <Card.Content>
                <Title style={styles.title}>{item.title}</Title>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
        numColumns={Math.floor(width / 320)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 300,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  cover: {
    width: 300,
  },
  title: {
    marginTop: 10,
    fontSize: 21,
  },
});

export default Activities;

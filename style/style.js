import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Pääcontainer, joka pitää Headerin ja Footerin paikallaan
  container: {
    flex: 1,
    backgroundColor: '#f4ddebd4',
    justifyContent: 'space-between', // Header ja Footer pysyvät paikallaan
  },
  // Sisältö, joka täyttää kaiken tilan Headerin ja Footerin välillä
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
  },
  // Header-tyyli
  header: {
    padding: 20,
    backgroundColor: '#d11f8db4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Footer-tyyli
  footer: {
    padding: 5,
    backgroundColor: '#f55cbad4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Otsikko
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 28,
    fontFamily: 'monospace',
    textAlign: 'center',
    margin: 10,
  },
  // Kirjoittajan nimi Footerissa
  author: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  // Pelialue
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginVertical: 20,
  },
  // Pelitilanteen tiedot
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  // Rivit, kuten nopat ja kategoriat
  row: {
    marginTop: 20,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  // Napin tyyli
  button: {
    margin: 30,
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Napin teksti
  buttonText: {
    color: "#2B2B52",
    fontSize: 20,
    textAlign: 'center',
  },
  // Syöttökenttä pelaajan nimelle
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  // Noppien tyyli
  diceColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  // Pisteiden asettelu
  pointsColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  // Pisteteksti
  pointsText: {
    fontSize: 18,
    textAlign: 'center',
  },
  // Jäljellä olevat heitot
  throwsLeft: {
    fontSize: 20,
    marginVertical: 10,
    textAlign: 'center',
  },
  // Tilateksti
  statusText: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  // Pelaajan nimi
  playerName: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  // Pistekohdat listassa
  scoreItem: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f4ddebd4',
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Pisteteksti
  scoreText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'monospace',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  // Kategoria riville
  categoryRow: {
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  // Kategoriateksti
  categoryText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar} from '@fortawesome/free-solid-svg-icons'
import { faHome} from '@fortawesome/free-solid-svg-icons'
import { faLaptop} from '@fortawesome/free-solid-svg-icons'
import { faTree} from '@fortawesome/free-solid-svg-icons'
import { faTshirt} from '@fortawesome/free-solid-svg-icons'
import { faBabyCarriage} from '@fortawesome/free-solid-svg-icons'
import { faTools} from '@fortawesome/free-solid-svg-icons'
import { faBriefcase} from '@fortawesome/free-solid-svg-icons'
import { faDog} from '@fortawesome/free-solid-svg-icons'
import { faFootballBall} from '@fortawesome/free-solid-svg-icons'


const carIcon = <FontAwesomeIcon icon={faCar} />
const houseIcon = <FontAwesomeIcon icon={faHome} />
const laptopIcon = <FontAwesomeIcon icon={faLaptop} />
const treeIcon = <FontAwesomeIcon icon={faTree} />
const tshirtIcon = <FontAwesomeIcon icon={faTshirt} />
const babyIcon = <FontAwesomeIcon icon={faBabyCarriage} />
const toolsIcon = <FontAwesomeIcon icon={faTools} />
const caseIcon = <FontAwesomeIcon icon={faBriefcase} />
const dogIcon = <FontAwesomeIcon icon={faDog} />
const ballIcon = <FontAwesomeIcon icon={faFootballBall} />


let categories = [
  {icon : carIcon,    title : "Auto Moto Ambarcatiuni",       link : "automoto"},
  {icon : houseIcon,  title : "Imobiliare",                   link : "imobiliare"},
  {icon : laptopIcon, title : "Electronice Electrocasnice",   link : "electro"},
  {icon : treeIcon,   title : "Casa și grădină",              link : "casagradina"},
  {icon : tshirtIcon, title : "Modă și frumusețe",            link : "modafrumusete"},
  {icon : babyIcon,   title : "Mame și copii",                link : "mamecopii"},
  {icon : toolsIcon,  title : "Servicii Echipamente",         link : "seviciiechipamente"},
  {icon : caseIcon,   title : "Locuri de muncă",              link : "munca"},
  {icon : dogIcon,    title : "Animale de companie",          link : "animale"},
  {icon : ballIcon,   title : "Sport și Timp liber",          link : "sport"}
];


export default {categories : categories};

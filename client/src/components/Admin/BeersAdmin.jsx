import React from 'react';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import '../../css/BeersAdmin.css' 
import swal from 'sweetalert'
import { deleteBeer } from '../../Redux/actions';


export default function BeersAdmin ({id, name, IBU, ABV, image, price, stock}) {

const dispatch = useDispatch()
const history = useHistory()
const handleClickDelete = () => {
    swal(`Do you want to delete ${name}?`,{
        buttons: {
            catch: {
                text: "Confirm",
                value: "confirm",
              },
            cancel: "cancel",
          },
    })
    .then((value) => {
        switch (value) {
          case "confirm":
            swal(`${name} elimined`);
            dispatch(deleteBeer(id))
            break;
          default:
            swal("Delete canceled!");
        }
      });
}
const handleClickEdit = (id) => {
    history.push(`/admin/editBeer/${id}`)
}
    return (
        <div className="box">
            <div class="product">
                <div onClick={() => handleClickDelete(id)} className='iconDelete'></div>
                <div onClick={() => handleClickEdit(id)} className='iconPencil'></div>
			    <div onClick={() => history.push(`/beers/${id}`)} class="iconEye"></div>
                <img class='imgbeer'src={image} alt=" " />
	        </div>
            <div className='info'>
                <h4>{name}</h4>
                <span className='description'> 
                    IBU: {IBU} <br/>
                    ABV: {ABV} <br/>
                </span>
                <span className='price'>US${price}</span>
            </div>
            <div className='details'>
                <span className='stock'>
                    Stock: {stock} <br/>
                </span>
            </div>
        </div>
    )
}
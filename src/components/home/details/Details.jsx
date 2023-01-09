import React, { useEffect, useState } from "react"
import { MdStarRate } from "react-icons/md"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { ADD, DELETE, REMOVE_INT } from "../../../controller/action"

export const Details = () => {
  const [data, setData] = useState([])
  const { id } = useParams()

  //console.log(id)

  const getdata = useSelector((state) => state.cartReducer.carts)
  //console.log(getdata)

  const compare = () => {
    let compareData = getdata.filter((e) => {
      return e.id == id
    })
    setData(compareData)
  }

  useEffect(() => {
    compare()
  }, [id])

  // delete item
  const history = useHistory()
  const deletes = (id) => {
    dispatch(DELETE(id))
    history.push("/")
  }

  // increment item
  const dispatch = useDispatch()
  const increment = (e) => {
    dispatch(ADD(e))
  }

  // descriment item
  const decrement = (item) => {
    dispatch(REMOVE_INT(item))
  }

  return (
    <>
      <article>
        <section className='details'>
          <h2 className='details_title'>Product Details Pages</h2>
          {data.map((item) => (
            <div className='details_content'>
              <div className='details_content_img'>
                <img src={item.cover} alt='' />
              </div>
              <div className='details_content_detail'>
                <h1>{item.title}</h1>
                <div className='rating'>
                  <MdStarRate />
                  <MdStarRate />
                  <MdStarRate />
                  <MdStarRate />
                  <MdStarRate />
                  <label htmlFor=''>(1 customer review)</label>
                </div>
                <h3> ₹{item.price * item.qty}</h3>
                <p>{item.author}</p>
                <div className='qty'>
                  <div className='count'>
                    <button onClick={() => increment(item)}>
                      <AiOutlinePlus />
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={item.qty <= 1 ? () => deletes(item.id) : () => decrement(item)}>
                      <AiOutlineMinus />
                    </button>
                  </div>
                  <button className='button'>Add To Cart</button>
                </div>
                <div className='desc'>
                  <h4>PRODUCTS DESCRIPTION</h4>
                  <p>OPPO has been focusing on manufacturing camera phones, while innovating mobile photography technology breakthroughs.</p>
                  <h4> PRODUCT DETAILS</h4>
                  <ul>
                    <li>
                      <p> Model Name: A74 5G</p>
                    </li>
                    <li>
                      <p>RAM: 6 GB</p>
                    </li>
                    <li>
                      <p>Internal Storage: 128 GB</p>
                    </li>
                    <li>
                      <p>Display Size: 16.48 cm (6.49 inch)</p>
                    </li>
                    <li>
                      <p>Operating System: Android Q 11</p>
                    </li>
                    <li>
                      <p>Processor: Qualcomm Snapdragon 480 5G GPU 619 at 650 MHz Support 5G sim Powerful 2 GHz Octa-core processor</p>
                    </li>
                    <li>
                      <p>Primary Camera: 48MP + 2MP + 2MP </p>
                    </li>
                    <li>
                      <p>Secondary Camera: 8MP </p>
                    </li>
                    <li>
                      <p>Network Type: 5G, 4G VOLTE, 3G </p>
                    </li>
                    <li>
                      <p>Battery Capacity: 5000 mAh </p>
                    </li>
                    <li>
                      <p>In The Box: Phone,USB cable,Charger,SIM ejector tool,Protective case,Quick start guide,Safety guide </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>
      </article>
    </>
  )
}

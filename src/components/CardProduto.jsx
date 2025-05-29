import { useState } from 'react'
import './CardProduto.css'

export function CardProduto(props) {
     return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={props.image || "/placeholder.svg"}
          alt={props.name}
          width={300}
          height={190}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <div className='title-quantity'>
        <h2 className="product-name">{props.name}</h2>
        <h2 className="product-name">Quantidade: {props.quantidade}</h2>
        </div>
        <p className="item-erro">* Você não possui a quantidade suficiente em seu estoque</p>
        <div className="product-footer">
          
        </div>
      </div>
    </div>
  )
}
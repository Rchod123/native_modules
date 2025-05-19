package com.nativefunctions

import com.facebook.react.bridge.ReactApplicationContext
import kotlin.math.exp


class NativeFunctionsModule(readContext : ReactApplicationContext) : NativeFunctionsSpec(readContext){
    override fun getName() = NAME

    override fun add(a:Double,b:Double):Double{
        val result = a+b
        return result
    }

    override fun subtract(
        a: Double,
        b: Double,
    ):Double {
       val result = a - b
        return result;
    }

    override fun multiply(a: Double, b: Double): Double? {
       return a * b
    }

    override fun divide(a: Double, b: Double): Double? {
        return a / b
    }

    override fun modulus(a: Double, b: Double): Double? {
        return Math.PI;
    }

    override fun exponent(a: Double): Double? {
        return exp(a)
    }

    override fun squareRoot(a: Double): Double? {
        return a * a
    }


    companion object{
        const val NAME = "NativeFunctions"
    }
}
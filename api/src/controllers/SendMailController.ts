import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from 'path'

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body
    
    const usersRepository = getCustomRepository(UsersRepository)
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)
    
    const user = await usersRepository.findOne({ email }) // verifica se usuário existe
    
    if(!user) {
      return response.status(400).json({
        error: 'User does not exist!'
      })
    }
        
    const survey = await surveysRepository.findOne({ id: survey_id }) // verifica se pesquisa existe
    
    if(!survey) {
      return response.status(400).json({
        error: 'Survey does not exist!'
      })
    }
    
    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: process.env.URL_MAIL
    }

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: [{user_id: user.id}, {value: null}],
      relations: ['user', 'survey'] // relacionamento um para muitos, retornará o objeto completo como resposta da requisição
    })

    if(surveyUserAlreadyExists) { // impede que vários registros Pesquisa Usuário sejam criados na tabela
      await SendMailService.execute(email, survey.title, variables, npsPath)
      return response.json(surveyUserAlreadyExists)
    }

    // Salvar informações na tabela
    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id
    })

    await surveysUsersRepository.save(surveyUser)
    
    // Enviar e-mail

    await SendMailService.execute(email, survey.title, variables, npsPath)
    
    return response.json(surveyUser)
  }
}

export { SendMailController }
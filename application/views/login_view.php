<body class="login">
    <div>
        <div class="login_wrapper">
            <div class="animate form login_form">
                <section class="login_content">
                    <?php
						if (strlen(validation_errors()) > 0 || $error)
							echo "<p class='parsley-error'>Nome de usuário e/ou senha incorretos.</p>";
							
						echo form_open('login');
					?>
                        <h1>Bem Vindo</h1>
                        <div>
                            <input name="usuario" type="text" class="form-control" placeholder="Usuário" value="<?php echo set_value('usuario'); ?>" required />
                        </div>
                        <div>
                            <input name="senha" type="password" class="form-control" placeholder="Senha" value="" required />
                        </div>
                        <input type="submit" style="display: none !important" />
                        <div>
                            <a class="btn btn-default submit" style="color: #23527c;" onClick="document.forms[0].submit();">Entrar</a>
                            <a class="reset_pass" href="#">Esqueceu sua senha?</a>
                        </div>
                        
                        <div class="clearfix"></div>
                        
                        <div class="separator">
                            <p class="change_link" style="margin-bottom: 20px;">Novo usuário? Entre em contato com o administrador da empresa para criar uma conta.</p>
                            
                            <div class="clearfix"></div>
                            
                            <div>
                                <h1>Fiat Chrysler Automobiles</h1>
                                <p><i class="fa fa-copyright"></i> 2017 Todos os Direitos Reservados.<br/>AP3FR é um sistema de análises de produção desenvolvido para a FCA - Fiat Chrysler Automobiles.</p>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </div>
import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, createEntity, reset } from './practice.reducer';
import { IPractice } from 'app/shared/model/practice.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const PracticeUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const practiceEntity = useAppSelector(state => state.practice.entity);
  const loading = useAppSelector(state => state.practice.loading);
  const updating = useAppSelector(state => state.practice.updating);
  const updateSuccess = useAppSelector(state => state.practice.updateSuccess);

  const handleClose = () => {
    props.history.push('/practice' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...practiceEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...practiceEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="magicv4App.practice.home.createOrEditLabel" data-cy="PracticeCreateUpdateHeading">
            <Translate contentKey="magicv4App.practice.home.createOrEditLabel">Create or edit a Practice</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="practice-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('magicv4App.practice.title')} id="practice-title" name="title" data-cy="title" type="text" />
              <ValidatedField
                label={translate('magicv4App.practice.photoUrl')}
                id="practice-photoUrl"
                name="photoUrl"
                data-cy="photoUrl"
                type="text"
              />
              <ValidatedBlobField
                label={translate('magicv4App.practice.photo')}
                id="practice-photo"
                name="photo"
                data-cy="photo"
                openActionLabel={translate('entity.action.open')}
              />
              <ValidatedField
                label={translate('magicv4App.practice.voiceUrl')}
                id="practice-voiceUrl"
                name="voiceUrl"
                data-cy="voiceUrl"
                type="text"
              />
              <ValidatedBlobField
                label={translate('magicv4App.practice.voiceFile')}
                id="practice-voiceFile"
                name="voiceFile"
                data-cy="voiceFile"
                openActionLabel={translate('entity.action.open')}
              />
              <ValidatedField
                label={translate('magicv4App.practice.masterDescription')}
                id="practice-masterDescription"
                name="masterDescription"
                data-cy="masterDescription"
                type="text"
              />
              <ValidatedField
                label={translate('magicv4App.practice.masterAdvice')}
                id="practice-masterAdvice"
                name="masterAdvice"
                data-cy="masterAdvice"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/practice" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PracticeUpdate;
